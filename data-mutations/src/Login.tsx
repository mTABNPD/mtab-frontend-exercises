import { useId } from 'react';
import { useLoginUserMutation } from 'services/api';

export function Login() {
  const userNameId = useId();
  const passwordId = useId();
  const [triggerLogin] = useLoginUserMutation();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        triggerLogin({ email: 'a', password: 'b' })
      }}
    >
      <div>
        <label htmlFor={userNameId}>Username:&nbsp;</label>
        <input id={userNameId} />
      </div>
      <div>
        <label htmlFor={passwordId}>Password:&nbsp;</label>
        <input id={passwordId}/>
      </div>
      <button type="submit">Login</button>
    </form>
  )
}