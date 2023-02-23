import { Row , Col } from 'react-bootstrap';

export default function Banner () {
    
    return(

        <div id='banner' className='justify-content-center d-flex flex-column'>
            <Row className='m-0'>
                <Col className='text-center mt-4'>
                    <p id='bannerText'>
                    It doesn&apos;t matter where you go in life, as long as you go to the beach.
                    </p>
                    <button type="button" className="btn btn-secondary btn-md mx-2 ">Book Now</button>
                </Col>
            </Row>
        </div>
    )
}