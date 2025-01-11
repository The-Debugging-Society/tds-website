import { Link } from 'react-router-dom';
import HyperText from './ui/hyper-text';

const Navbar = () => {
  return (
    <div className="flex justify-between items-center p-5 sticky top-0 bg-black z-50">
      <Link to="/"><img src="logo.jpeg" alt="TDS Logo" className="h-12 w-12" /></Link>
      <div className="text-white flex gap-5">
        <Link to="/about"><HyperText className={"text-lg text-blue-500"}>About-us</HyperText></Link>
        <Link to="/community"><HyperText className={"text-lg text-blue-500"}>Community</HyperText></Link>
        <Link to="/events"><HyperText className={"text-lg text-blue-500"}>Events</HyperText></Link>
        <Link to="/blogs"><HyperText className={"text-lg text-blue-500"}>Blogs</HyperText></Link>
        <Link to="/alumni"><HyperText className={"text-lg text-blue-500"}>Alumni</HyperText></Link>
      </div>
    </div>
  );
};

export default Navbar;