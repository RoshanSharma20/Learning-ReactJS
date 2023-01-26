import React from 'react'

function NewsItem(props) {
    let { title, description, imageUrl, newsUrl, author, date } = props
    return (
        <div>
            <div className="card my-2">
                <img src={imageUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-muted">By {author ? author : "Unknown"} at {new Date(date).toGMTString()}</small></p>
                    <a without rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-success">Read More</a>
                </div>
            </div>
        </div>
    )
}

export default NewsItem

