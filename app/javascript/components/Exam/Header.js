import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    padding: 50px 100px 50px 0;
    font-size: 30px;

    img {
        height: 60px;
        width: 60px;
        border-radius: 100%;
        border: 1px solid rbga(0,0,0,0.1);
        margin-bottom: -8px;
    }
`

const TotalReviews = styled.div`
    font-size: 18px;
    padding: 10px 0;
`

const TotalOutOf = styled.div`
    font-size: 18px;
    font-weight: bold;
    padding: 10px 0;
`

const Header = (props) => {
    const { category, avg_score } = props.attributes
    const total = getTotal()

    function getTotal() {
        let total = 0;

        props.reviews.forEach(element => {
            if (element.type === 'review')
                total += 1
        });

        return total
    }

    return (
        <Wrapper>
            <h1>{ category }</h1>
            <div>
                <TotalReviews>{ total } User reviews</TotalReviews>
                <div className="starRating"></div>
                <TotalOutOf>{ avg_score } of 5</TotalOutOf>
            </div>
        </Wrapper>
    )
}

export default Header