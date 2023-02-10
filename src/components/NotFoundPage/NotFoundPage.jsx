import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
    return (
        <div>
            <h3>Page not found</h3>
            <Link to="/">To Home page</Link>
        </div>
    );
};

export default NotFoundPage;
