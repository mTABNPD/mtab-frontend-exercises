import { ButtonProps, Button} from 'react-bootstrap';

import './PostLikeButton.scss';

export const PostLikeButton = ({ isLiked, ...buttonProps }: ButtonProps & { isLiked?: boolean; }) => {
  return (
    <div className="c-post-like">
      {isLiked ? (
          <Button variant="danger" {...buttonProps} />
      ) : (
        <Button variant="outline-secondary" {...buttonProps} />
      )}
    </div>
  );
}
