const ShareArticle = ({ postUrl }: { postUrl: string }) => {
  return (
    <div className="bg-primary-400 shadow-lg rounded-xl p-4">
      <h2 className="text-lg text-white font-bold mb-4">Share this article</h2>
      <div className="flex items-center space-x-4">
        {/* Social Share Links */}
        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center space-y-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="70"
            height="70"
            viewBox="0 0 24 24"
          >
            <path
              d="M10.053,7.988l5.631,8.024h-1.497L8.566,7.988H10.053z M21,6v12	c0,1.657-1.343,3-3,3H6c-1.657,0-3-1.343-3-3V6c0-1.657,1.343-3,3-3h12C19.657,3,21,4.343,21,6z M17.538,17l-4.186-5.99L16.774,7	h-1.311l-2.704,3.16L10.552,7H6.702l3.941,5.633L6.906,17h1.333l3.001-3.516L13.698,17H17.538z"
              fill="white"
            ></path>
          </svg>
          <p className="text-white">Twitter</p>
        </a>

        <a
          href={`https://www.linkedin.com/shareArticle?url=${encodeURIComponent(postUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center space-y-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="70"
            height="70"
            viewBox="0 0 24 24"
          >
            <path
              d="M19,3H5C3.895,3,3,3.895,3,5v14c0,1.105,0.895,2,2,2h14c1.105,0,2-0.895,2-2V5C21,3.895,20.105,3,19,3z M9,17H6.477v-7H9 V17z M7.694,8.717c-0.771,0-1.286-0.514-1.286-1.2s0.514-1.2,1.371-1.2c0.771,0,1.286,0.514,1.286,1.2S8.551,8.717,7.694,8.717z M18,17h-2.442v-3.826c0-1.058-0.651-1.302-0.895-1.302s-1.058,0.163-1.058,1.302c0,0.163,0,3.826,0,3.826h-2.523v-7h2.523v0.977 C13.93,10.407,14.581,10,15.802,10C17.023,10,18,10.977,18,13.174V17z"
              fill="white"
            ></path>
          </svg>
          <p className="text-white">LinkedIn</p>
        </a>
      </div>
    </div>
  );
};

export default ShareArticle;
