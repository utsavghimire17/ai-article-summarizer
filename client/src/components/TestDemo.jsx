import React, { useState, useEffect } from 'react';
import { copy, loader, tick, linkIcon } from '../assets';
import { useLazyGetSummaryQuery } from '../services/article';
import { textApi } from '../services/text';
import { API } from '../services/user-api';

const MAX_HISTORY_SIZE = 5;

const Demo = () => {
  const [step, setStep] = useState('select'); // 'select', 'text', or 'link'
  const [textArticle, setTextArticle] = useState({
    content: '',
    summary: '',
  });
  const [linkArticle, setLinkArticle] = useState({
    content: '',
    summary: '',
  })
  const [fetching, setFetching] = useState(false)
  const [saveValues, setSaveValues] = useState({email:'', body:[]})
  const [allArticles, setAllArticles] = useState([]);
  const [textResult, setTextResult] = useState('');
  const [linkResult, setLinkResult] = useState('');
  const [textHistory, setTextHistory] = useState([]);
  const [linkHistory, setLinkHistory] = useState([]);
  const [copied, setCopied] = useState('');

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    localStorage.removeItem('articles');
    const textArticlesFromLocalStorage = JSON.parse(localStorage.getItem('textHistory')) || [];
    const email = getEmailFromCookie();

    API.getHistory(null, { email: email })
        .then(linkArticlesFromLocalStorage => {
            setTextHistory(textArticlesFromLocalStorage);
            setLinkHistory(linkArticlesFromLocalStorage.data.history);
            console.log(linkArticlesFromLocalStorage.data.history)
        })
        .catch(error => {
            // Handle the error
            console.error(error);
        });
}, []);

  
  const getEmailFromCookie = () => {
    const cookies = document.cookie.split(';');
    const emailCookie = cookies.find(cookie => cookie.trim().startsWith('email='));
  
    if (emailCookie) {
      
     const email =  emailCookie.split('=')[1].trim();
     return email;
      
    }
  
    return null;
  
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
        if (step === 'text') {
          
          setFetching(true)
          const textSummary = await textApi(textArticle.content);
    
          const newtextArticle = { ...textArticle, summary: textSummary };
          const updatedTextHistory = [newtextArticle, ...textHistory];
    
          if (updatedTextHistory.length > MAX_HISTORY_SIZE) {
            updatedTextHistory.pop();
          }
          setFetching(false)
          setTextArticle(newtextArticle);
          setTextHistory(updatedTextHistory);
          setTextResult(textSummary);
    
          localStorage.setItem('textHistory', JSON.stringify(updatedTextHistory));

        } else if (step === 'link') {
          const { data } = await getSummary({ articleUrl: linkArticle.content });
          getEmailFromCookie()
          if (data?.summary) {
            const newlinkArticle = { ...linkArticle, summary: data.summary };
            const updatedLinkHistory = [newlinkArticle, ...linkHistory];
    
            if (updatedLinkHistory.length > MAX_HISTORY_SIZE) {
              updatedLinkHistory.pop();
            }
    
            setLinkArticle(newlinkArticle);
            setLinkHistory(updatedLinkHistory);
            setLinkResult(data.summary);
            console.log(updatedLinkHistory)
            const email = getEmailFromCookie()
            setSaveValues({...saveValues, email:email, body:updatedLinkHistory})
            console.log(saveValues)
            let res = await API.saveHistory(saveValues,{email:email})
            localStorage.setItem('linkHistory', JSON.stringify(updatedLinkHistory));
          }
        }
    } 


  

  const handleGoBack = () => {
    // Set step to 'select' to go back to selecting stage
    setStep('select');
    setSaveValues({ email: '', body: [] });
  };

  const handleCopy = (copyContent) => {
    setCopied(copyContent);
    navigator.clipboard.writeText(copyContent);
    setTimeout(() => setCopied(''), 3000);
  };

  return (
    <section className="mt-16 w-full max-w-xl">
      {/* {Select text or link} */}
      {step === 'select' && (
        <div className="w-screen flex justify-center items-center flex-row gap-10">
          <button  onClick={() => setStep('text')} className="text-gray-900 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-300 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            Paste Text
          </button>
          <button onClick={() => setStep('link')} className="text-gray-900 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-300 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            Paste Link
          </button>
        </div>
      )}

      {/* {Input form based on the selected step} */}

      <section className="mt-16 w-full max-w-xl"></section>
      <div className="flex flex-col items-center w-screen ml-10 gap-2">
      {step === 'text' && (
        <form className="relative flex justify-center items-center w-1/3" onSubmit={handleSubmit}>
          <textarea
            placeholder="Enter text to summarize"
            value = {textArticle.content}
            onChange={(e) => setTextArticle({ ...textArticle, content: e.target.value })}
            required
            className="placeholder:italic url_input peer h-36"
          />
          <button type="submit" className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700">
            ↵
          </button>
        </form>
      )}

      {step === 'link' && (
        <div className="w-screen flex justify-center">
        <form className="relative flex justify-center items-center w-1/3" onSubmit={handleSubmit}>
          <img src={linkIcon} alt="link_icon" className="absolute left-0 my-2 ml-3 w-5" />
          <input
            type="url"
            placeholder="Enter a URL"
            value={linkArticle.content}
            onChange={(e) => setLinkArticle({ ...linkArticle, content: e.target.value })}
            required
            className="placeholder:italic url_input peer"
          />
          <button type="submit" className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700">
            ↵
          </button>
        </form>
        </div>
      )}

      {/* {browse URL history} */}
      {step !== 'select' && step == 'link' && (
        <div className="w-screen flex justify-center">
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto w-1/3">
          {linkHistory.map((item, index) => (
            <div key={`link-${index}`} onClick={() => setLinkArticle(item)} className="link_card">
              <div className="copy_btn" onClick={() => handleCopy(item.content)}>
                <img
                  src={copied === item.content ? tick : copy}
                  alt="copy_icon"
                  className="w-[40%] h-[40%] object-contain"
                />
              </div>
              <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                {item.content}
              </p>
            </div>
          ))}
        </div>
        </div>
    
      )}
    </div>

      {/* {display results text} */}
 

      <div className="w-screen flex flex-row justify-center">
      <div className="my-10 w-1/3 ml-20 flex justify-center items-center">
      {step !== 'select' && step == 'text'
       && (
        <div className="my-10 max-w-full flex justify-center items-center">
          {fetching ? (
            <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
          ) : error ? (
            <p className="font-inter font-bold text-black text-center">
              Couldn't find a summary. Find a proper article with less images and clear texts.
              <br />
              <span className="font-satoshi font-normal text-gray-700">
                {error?.data?.error}
              </span>
            </p>
          ) : (
            textArticle.summary && (
              <div className="flex flex-col gap-3">
                <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                  Article <span className="blue_gradient">Summary</span>
                </h2>
                <div className="summary_box">
                  <p className="font-inter font-medium text-sm text-gray-700">{textArticle.summary}</p>
                </div>
              </div>
            )
          )}
        </div>
   
      )}
    </div>
    </div>
   

   {/* {display results link} */}
<div className="w-screen flex flex-row justify-center">
{step !== 'select' && step == 'link' && (
        
        <div className="my-10 w-1/3 flex justify-center items-center">
          {isFetching ? (
            <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
          ) : error ? (
            <p className="font-inter font-bold text-black text-center">
              Couldn't find a summary. Find a proper article with less images and clear texts.
              <br />
              <span className="font-satoshi font-normal text-gray-700">
                {error?.data?.error}
              </span>
            </p>
          ) : (
            linkArticle.summary && (
              <div className="flex flex-col gap-3 ml-10">
                <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                  Article <span className="blue_gradient">Summary</span>
                </h2>
                <div className="summary_box">
                  <p className="font-inter font-medium text-sm text-gray-700">{linkArticle.summary}</p>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
   

{step !== 'select' && (
        <div className="w-screen flex flex-row justify-center">
        <div className="mt-2">
          <button onClick={handleGoBack} className="text-gray-900 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-300 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            Go Back
          </button>
        </div>
        </div>
      )}
      
    </section>
  );
};


export default Demo;
