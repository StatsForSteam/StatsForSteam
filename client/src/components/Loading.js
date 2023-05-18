import Spinner from 'react-bootstrap/Spinner';
import '../index.scss';

function Loading() {
    return(
        <div className="loading">
           <h3 style={{color:'var(--tertiary-color)'}}>Loading...</h3>
        <Spinner style={{color: 'var(--tertiary-color)'}} animation="border" role="status"/> 
        </div>  
    );

    }

 export default Loading;
