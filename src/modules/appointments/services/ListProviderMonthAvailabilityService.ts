import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

import IAppointmentsRepository from '../repositories/IAppointmentsRepositories';

interface IRequest {
  user_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
  constructor() {}

  public async execute({ user_id, year, month }: IRequest): Promise<IResponse> {
    return [
      {
        day: 1,
        available: false,
      },
    ];
  }
}

export default ListProviderMonthAvailabilityService;
