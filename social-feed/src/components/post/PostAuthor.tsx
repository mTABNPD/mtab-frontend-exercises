import { useMemo } from 'react';

import { Post } from 'types/feed';

import './PostAuthor.scss';

const formatter = new Intl.DateTimeFormat('en', { dateStyle: 'full', timeStyle: 'short' });

export const PostAuthor = ({ author, posted }: Pick<Post, 'author' | 'posted'>) => {
  const formattedDateTime = useMemo(() => formatter.format(new Date(posted)), [posted]);

  return (
      <div className="c-post-author">
        <span className="c-post-author__identity">{author.displayName}</span>
        {' — '}
        <span className="c-post-author__date-time">{formattedDateTime}</span>
      </div>
  );
};