import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProviderMonthAvailability from './ListProviderMonthAvailabilityService';

let fakeUsersRepository: FakeUsersRepository;
let listProviderMonthAvailability: ListProviderMonthAvailability;

describe('listProviderMonthAvailability', () => {
  beforeEach(() => {
    listProviderMonthAvailability = new ListProviderMonthAvailability();
  });

  it('should be able to list the month availability from provider', async () => {});
});
