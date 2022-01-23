const _ = require('lodash');

const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {

    const temp = blogs.map(x => x.likes)
    const reducer = (sum, item) => {
        return sum + item
    }
    return temp.length === 0 ? 0 : temp.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const mostLikes = Math.max(...blogs.map(x => x.likes))

    const favBlog = blogs.find(x => x.likes === mostLikes)

    const result = {
        "title": favBlog.title,
        "author": favBlog.author,
        "likes": favBlog.likes
    }


    return result
}

const mostBlogs = (blogs) => {
    const authArray      = _.map(blogs, 'author')
    const mostCommonAuth = _.chain(authArray).countBy().toPairs().max()
    const result = {
        "author": mostCommonAuth.head().value(),
        "blogs": mostCommonAuth.tail().value()[0]
    }

    return result

}

const mostLikes = (blogs) => {
    const mostLikes = Math.max(...blogs.map(x => x.likes))
    const blogObj   = blogs.find(x => x.likes === mostLikes)

    const result = {
        "author": blogObj.author,
        "likes": blogObj.likes
    }

    return result
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}