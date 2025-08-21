import Display from './Display';
import Menu from './Menu';
function Home() {
    return (
        <div className="row g-0">
            <div className="col-lg-2 col-md-2 col-6">
                <Menu />
            </div>
            <div className='col-lg-10'>
                <Display />
            </div>
        </div>
    );
}

export default Home;