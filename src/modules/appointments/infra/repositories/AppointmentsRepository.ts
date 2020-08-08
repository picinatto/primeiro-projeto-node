import { EntityRepository, Repository } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepositories';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment>
  implements IAppointmentsRepository {
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    // Find one extends from repository and receives a where condition
    const findAppointment = await this.findOne({
      where: { date },
    });

    return findAppointment;
  }
}

export default AppointmentsRepository;
