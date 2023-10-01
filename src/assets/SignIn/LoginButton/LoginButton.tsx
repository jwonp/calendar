
import { ClientSafeProvider, signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

const LoginButton = ({ provider }: { provider: ClientSafeProvider }) => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") as string;

  return (
    <div>
      <button
        onClick={() => {
          signIn(provider.id, {
            callbackUrl: callbackUrl,
          });
        }}>
        Sign in with {provider.name}
      </button>
    </div>
  );
};

export default LoginButton;
