import { faker } from '@faker-js/faker';

import { UserProfile } from 'types/user';

export function createUserProfile(
  properties: Partial<UserProfile> = {}
): UserProfile {
  return {
    email: faker.internet.email(),
    displayName: faker.internet.userName(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    avatar: faker.internet.avatar(),
    ...properties
  }
}