import { useEffect, useState } from 'react';

import { useGetProfileQuery, useMutateProfileMutation } from 'services/api';

export function Greeting() {
  const { data: profile, isLoading } = useGetProfileQuery();
  const [triggerMutation] = useMutateProfileMutation();
  const [displayName, setDisplayName] = useState<string>('');

  useEffect(() => {
    if (!profile) {
      return
    }

    setDisplayName(profile.displayName)
  }, [profile]);

  if (isLoading || !profile) {
    return 'Loading...';
  }

  return (
    <>
      <h1>
        Hello,
        {' '}
        {profile.displayName}
      </h1>
      <input
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
      />
      {' '}
      <button
        onClick={() => displayName && triggerMutation({ ...profile, displayName })}
        disabled={!displayName}
      >
        Change name
      </button>
    </>
  );
}