import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link href="/" className="navbar-brand">
                    Instawish
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;