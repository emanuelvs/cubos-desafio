import React from 'react'
import './style.css'

const StylizedCircle = ({data, size}: any) => {

    return (
        <div className="stylized-circle-container" style={{width: size, height: size}}>
            <div className="stylized-circle-wrapper" style={{width: size, height: size}}>
                <div className="stylized-circle" style={{width: size - 8, height: size - 8}}>
                    <span className="stylized-circle-data" style={{fontSize: size * 0.4}}>
                        {data}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default StylizedCircle