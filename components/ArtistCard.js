const Artist = (props) => {
  const { name, latestCollection, imageUrl } = props;
  console.log("artist child", props);
  return (
    <div className="w-full md:w-3/4 flex flex-col rounded-lg shadow-lg overflow-hidden">
      <div className="flex-shrink-0">
        <img
          className="h-48 md:h-56 w-full object-cover"
          src={latestCollection.thumbnailUrl}
          alt=""
        />
      </div>
      <div className="flex-1 bg-white p-6 flex flex-col justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-indigo-600">
            <a href="#" className="hover:underline">
              Case Study
            </a>
          </p>
          <a href="#" className="block mt-2">
            <p className="text-xl font-semibold text-gray-900">
              Improve your customer experience
            </p>
          </a>
        </div>
        <div className="mt-6 flex items-center">
          <div className="flex-shrink-0">
            <a href="#">
              <span className="sr-only">Daniela Metz</span>
              <img className="h-10 w-10 rounded-full" src={imageUrl} alt="" />
            </a>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">
              <a href="#" className="hover:underline">
                {latestCollection.title}
              </a>
            </p>
            <div className="flex space-x-1 text-sm text-gray-500">
              <span aria-hidden="true">&middot;</span>
              <span>11 min read</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Artist;
