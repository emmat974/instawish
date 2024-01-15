import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link href="/" className="navbar-brand">
                    Instawish
                </Link>
                <div className="d-flex justify-content-start">
                    <Link href="/logout" className="nav-link">
                        Déconnexion
                    </Link>
                </div>
            </div>

        </nav>
    );
};

export default Navbar;