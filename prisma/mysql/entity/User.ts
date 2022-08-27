import {Post} from './Post';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: true })
    name: string

    @Column({ unique: true })
    email: string

    @Column({ nullable: true })
    createAt: any

    @OneToMany((type) => Post, (post) => post.author)
    post: Post[]
}
