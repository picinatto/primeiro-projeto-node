import { startOfHour, isBefore, getHours, format } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import IAppointmentsRepository from '../repositories/IAppointmentsRepositories';

interface IRequest {
  provider_id: string;
  user_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
  ) {}

  public async execute({
    date,
    provider_id,
    user_id,
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError('You cannot create an appointment on a past date');
    }

    if (user_id === provider_id) {
      throw new AppError('You cannot create an appointment with yourself');
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError(
        'You can only create appointments between 8 am and 5 pm',
      );
    }

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked!');
    }

    // Creates the appointment object in memory
    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });
    // Saves the object on the Database

    const dateFormated = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm'h'");

    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamento para dia ${dateFormated}`,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
