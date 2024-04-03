import React from "react";
import internal from "stream";
const Toast = ({message, id}:{message:string; id:string;}) => {
  return (
    <div id={id} className=" z-50 max-w-xs bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700"
         role="alert">
      <div className="flex p-4">
        <div className="flex-shrink-0">
          <svg className="flex-shrink-0 size-4 text-yellow-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16"
               height="16" fill="currentColor" viewBox="0 0 16 16">
            <path
              d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
          </svg>
        </div>
        <div className="ms-3">
          <p className="text-sm text-gray-700 dark:text-gray-400">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Toast;
