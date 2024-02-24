export default (sequelise, dataTypes) => {
    const User = sequelise.define('user', {
        username: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: dataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        birthday: {
            type: dataTypes.DATE,
            allowNull: false,
        },
        avatar: {
            type: dataTypes.STRING,
            defaultValue: 'https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-media-1677509740',
        },
        // followers: {
        //   type: dataTypes.ARRAY()
        // }
    }, { timestamps: true });
    return User;
};
