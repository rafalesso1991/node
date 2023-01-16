import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeUser1673888757146 implements MigrationInterface {
    name = 'ChangeUser1673888757146'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`role\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`invoices_details\` ADD CONSTRAINT \`FK_7afc8eac0e7fb3b71c91c7da27f\` FOREIGN KEY (\`invoice_id\`) REFERENCES \`invoices\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`invoices_details\` ADD CONSTRAINT \`FK_d7f0fa1f9a61719cc5b22a81e24\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_9a5f6868c96e0069e699f33e124\` FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_9a5f6868c96e0069e699f33e124\``);
        await queryRunner.query(`ALTER TABLE \`invoices_details\` DROP FOREIGN KEY \`FK_d7f0fa1f9a61719cc5b22a81e24\``);
        await queryRunner.query(`ALTER TABLE \`invoices_details\` DROP FOREIGN KEY \`FK_7afc8eac0e7fb3b71c91c7da27f\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`role\``);
    }

}
