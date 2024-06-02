import React, {useState, useEffect} from 'react'
import {Loader, Card, FormField} from '../components'
const handleLike = async (postId) => {
  console.log(postId)
}
const RenderCards = ({data, title}) => {
  if(data?.length > 0){
  return data.map((post) => <div key={post._id}>
    <Card {...post}>
    <button onClick={()=> handleLike(post._id)}>Like</button>
    </Card>
    
  </div>)
  }
  return(
    <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>
  )
    
};
const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [searchText, setsearchText] = useState('');
  const [searchedResults, setSearchedResults] = useState(null)
const [searchTimeout, setSearchTimeout] = useState(null)
  
  const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/v1/post', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        setAllPosts(result.data.reverse());
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setsearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));
        setSearchedResults(searchResult);
      }, 500),
    );
  };

  
  return (
    <section className="max-w-7x1 mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">The Community Showcase</h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">See what others like you are creating with DALL-E AI</p>
      </div>
      <div className="mt-16">
        <FormField
        labelName='Search Posts'
        type="text"
        name="text" 
        placeholder="Search Posts"
        value={searchText}
        handleChange={handleSearchChange}/>
      </div>
      <div className="mt-10">
        { 
            loading ? (
            <div className="flex justify-center items-center">
              <Loader />
            </div>
          ) : ( <>
                  {searchText && (
                    <h2 className="font-medium text-[#666e75] text-xl mb-3"> Showing results for <span className='text-[#222328]'>{searchText}</span> </h2>
                  )}
                  <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
                    {searchText ? (
                      <RenderCards 
                      data={searchedResults}
                      title="No Results Found"
                      />
                    ) : (
                      <RenderCards 
                      data={allPosts}
                      title="No Posts Found"
                      />
                    )}
                  </div>
                </>
            )
        }
      </div>
      
    </section>
  )
}

export default Home