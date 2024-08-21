import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";
const Header = () => {
  return (
    <div className="flex justify-between items-center">
      <Link href={"/"}>
        <Image
          className="h-8 w-auto"
          width={100}
          height={100}
          src={"/img/genz.png"}
          alt="LogoImg"
        />
      </Link>
      <div>
        <Button
          style={{
            fontSize: "16px",
            color: "white",
            border: "1px solid white",
            outline: "none",
          }}
          type="text"
          className="text-9xl"
        >
          Log In
        </Button>
      </div>
    </div>
  );
};

export default Header;
