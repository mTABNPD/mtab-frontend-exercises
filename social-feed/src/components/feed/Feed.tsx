import { ReactNode } from 'react';
import { Container, Col, Row } from 'react-bootstrap';

import { Post as PostComponent } from 'components/post';
import { Post } from 'types/feed';

import './Feed.scss';

export interface FeedProps {
  title: ReactNode;
  posts: Post[];
  onPostLike: (postId: string) => void;
}

export const Feed = ({
  posts,
  title,
  onPostLike
}: FeedProps) => {
  return (
    <Container className="c-feed">
      <Row className="c-feed__header">
        <Col className="c-feed__title">
          <h3>{title}</h3>
        </Col>
      </Row>
      <Row className="c-feed__content">
        {posts.map((post) => (
          <PostComponent key={post.id} {...post} onLike={onPostLike}/>
        ))}
      </Row>
    </Container>
  );
};
