import React from 'react'
import {HashLoader} from 'react-spinners'

function WaitingDialoag() {
  return (
    <div className="fixed z-10 inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <HashLoader
            color="#50b9fa"
            size={80}
       />
    </div>
  )
}

export default WaitingDialoag