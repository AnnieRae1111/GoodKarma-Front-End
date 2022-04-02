    import {
    Col,
    CardColumns,
    Card,
    CardImg,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardText,
    Row,
    } from 'reactstrap';

    import { Link } from 'react-router-dom';

    const AvailableItemsCard = ({ deleteItem, claimItem, item }) => {
    return (
        <div className="available-items-card-container">
        <Row>
            <Col>
            <CardColumns>
                <Card className="available-items-card">
                <CardImg
                    alt="Card image cap"
                    src={item.photoUrl}
                    top
                    width="100%"
                />
                <CardBody>
                    <CardTitle tag="h5">
                    <strong>Category:</strong> {item.category}
                    </CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                    <strong>Title:</strong> {item.title}
                    </CardSubtitle>
                    <CardText>
                    <strong>Date Posted:</strong> {item.date_posted}
                    </CardText>
                    <CardText>
                    <strong>Posted By:</strong> {item.owner}
                    </CardText>
                    <CardText>
                    <strong>Description:</strong> {item.description}
                    </CardText>
                    <button
                    className="claim-item-button"
                    onClick={() => claimItem(item._id)}
                    >
                    Claim item
                    </button>
                    <br />
                    <button
                    className="claim-item-button"
                    onClick={() => deleteItem(item._id)}
                    >
                    Delete Post
                    </button>
                    <br />
                    <Link to={`/edit/${item._id}`}>
                    <button className="claim-item-button">Edit</button>
                    </Link>
                </CardBody>
                </Card>
            </CardColumns>
            </Col>
        </Row>
        </div>
    );
    };

    export default AvailableItemsCard;
