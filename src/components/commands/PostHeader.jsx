import React from 'react'
const userImagePlaceholder = "https://static.vecteezy.com/system/resources/previews/036/594/092/non_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg";

export default function PostHeader({ avatar, header, subHeader }) {
    return (
        <div className="flex">
            <img onError={(e) => e.target.src = userImagePlaceholder}  className=" rounded-full w-10 h-10 mr-3" src={avatar} alt />
            <div>
                <h3 className="text-md font-semibold ">{header}</h3>
                <p className="text-xs text-gray-500">{subHeader}</p>
            </div>
        </div>
    )
}
