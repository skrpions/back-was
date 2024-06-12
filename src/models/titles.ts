import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

const Title = sequelize.define(
	'title',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		tableName: 'titles',
		timestamps: false,
	}
);

export default Title;
