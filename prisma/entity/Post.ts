import {User} from './User';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column({ nullable: true })
    content: string

    @ManyToOne((type) => User, (user) => user.post)
    author: User
}
