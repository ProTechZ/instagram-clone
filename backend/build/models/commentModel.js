export default (sequelise, dataTypes) => {
    const Comment = sequelise.define('comment', {
        post: {
            type: 'post',
        },
        creator: {
            type: 'user',
            allowNull: false,
        },
        numOfLikes: {
            type: dataTypes.INTEGER,
            defaultValue: 0,
        },
        replies: {
            type: dataTypes.STRING,
            allowNull: false,
        },
    }, { timestamps: true });
    return Comment;
};
