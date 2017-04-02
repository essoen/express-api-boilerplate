/**
* Example model
* @module models/example
*/

/**
* Example model - create and export the database model for the example
* including all assosiations and classmethods assiciated with this model.
* @memberof  module:models/Example
* @param  {Object} sequelize description
* @param  {Object} DataTypes description
*/
export default function (sequelize, DataTypes) {
    const Example = sequelize.define('example', {
        name: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: true
        }
    }, {
        name: {
            singular: 'example',
            plural: 'examples'
        }
    // For reference:
    //   hooks {},
    //   classMethods: {
    //        associate(models) {
    //            // Create associations here
    //        }
    //    }
    }
    );
    return Example;
}
