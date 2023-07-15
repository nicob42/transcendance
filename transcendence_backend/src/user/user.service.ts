// user.service.ts

// Service (user.service.ts) : Il s'occupe de la logique métier.
// C'est ici que vous allez chercher des informations dans votre
// base de données ou effectuer d'autres actions liées à l'utilisateur.
// Le service est utilisé par le contrôleur.

// user.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findUserById(userId: number): Promise<User> {
    const options: FindOneOptions<User> = {
      where: { id: userId },
    };

    return this.userRepository.findOneOrFail(options);
  }
  // AJOUT 2FA

	async enableTwoFactorAuth(userId: any): Promise<User | null> {
	  const user = await this.userRepository.findOne(userId);
	  if (user) {
		user.twoFactorEnabled = true;
		await this.userRepository.save(user);
	  }
	  return user;
	}

	async disableTwoFactorAuth(userId: any): Promise<User | null> {
	  const user = await this.userRepository.findOne(userId);
	  if (user) {
		user.twoFactorEnabled = false;
		await this.userRepository.save(user);
	  }
	  return user;
	}

    async save(user: User): Promise<User> {
    	return await this.userRepository.save(user);
  }
  async updateUserImage(userId: number, imageUrl: string): Promise<User> {
    const user = await this.findUserById(userId);
    user.imageUrl = imageUrl;
    console.log(' user service user.img ====>'+ user.imageUrl)
    await this.userRepository.save(user);
    return user;
  }
  async updateUsername(userId: number, username: string): Promise<User> {
	const user = await this.findUserById(userId);
	console.log(' user service user ====>'+ user)
	if (!user) {
	  console.log('User not found');
	}
	user.username = username;
	console.log(' user service user.username ====>'+ user.username)
	await this.userRepository.save(user);
	return user;
  }
}
