import { Card } from 'react-bootstrap';

import { Post as PostShape, PostType } from 'types/feed';

import { PostAuthor } from './PostAuthor';
import { PostLikeButton } from './PostLikeButton';

import './Post.scss';

const PostMessage = ({ content }: Pick<PostShape, 'content'>) => {
  if (typeof content === 'string') {
    return (
      <Card.Text>{content}</Card.Text>
    )
  }

  const { message } = content;

  if (Array.isArray(message)) {
    return (
      <>
        {message.map((m, i) => (
          <PostMessage key={i} content={m}/>
        ))}
      </>
    );
  }

  return (
    <PostMessage content={message} />
  );
}

const InformationPostTitle = () => (
  <Card.Title>New data shared</Card.Title>
);
const CommentPostTitle = ({ author }: Pick<PostShape, 'author'>) => (
  <Card.Title>{author.displayName} commented</Card.Title>
);

const PostTitle = ({ title, type, author }: Pick<PostShape, 'author' | 'title' | 'type'>) => {
  if (title) {
    return (
      <Card.Title>Post</Card.Title>
    );
  }

  if (type === PostType.INFORMATION) {
    return <InformationPostTitle />
  }

  if (type === PostType.COMMENT) {
    return <CommentPostTitle author={author} />;
  }

  return null;
}


export const Post = ({
  id,
  author,
  title,
  content,
  type,
  posted,
  isLiked,
  onLike
}: PostShape & { onLike: (postId: string) => void }) => {
  return (
    <Card className="c-post">
      <PostLikeButton onClick={() => onLike(id)} isLiked={isLiked} />
      <Card.Body>
        <PostTitle type={type} title={title} author={author} />
        <PostMessage content={content} />
      </Card.Body>
      <Card.Footer>
        <PostAuthor author={author} posted={posted} type={type}/>
      </Card.Footer>
    </Card>
  );
};