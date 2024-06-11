import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import User from './user';

export const Certificate = sequelize.define(
	'certificate',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		institution: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		certificationDate: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		certificateType: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		userId: {
			type: DataTypes.INTEGER,
			references: {
				model: User,
				key: 'id',
			},
			allowNull: false,
		},
	},
	{
		tableName: 'certificates',
		timestamps: false,
	}
);

User.hasMany(Certificate, { foreignKey: 'userId', sourceKey: 'id' });
Certificate.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });
