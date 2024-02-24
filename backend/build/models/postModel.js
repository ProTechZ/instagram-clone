export default (sequelise, dataTypes) => {
    const Post = sequelise.define('post', {
        caption: {
            type: dataTypes.STRING,
            allowNull: true,
        },
        img: {
            type: dataTypes.STRING,
            allowNull: false
        },
        numOfLikes: {
            type: dataTypes.INTEGER,
            defaultValue: 0,
        },
    }, { timestamps: true });
    return Post;
};
