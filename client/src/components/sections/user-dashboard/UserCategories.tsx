import { useEffect, useState } from "react";
import { useCategoriesPageProviderContext } from "../../../Provider/CategoriesPageProvider";
import UserCategoryCard from "../../cards/UserCategoryCard";
import ArriveAnimationContainer from "../../ui/ArriveAnimationContainer";
import CreateUserCategoryModal from "../../ui/CreateUserCategoryModal";
import DashboardSectionHeading from "../../ui/DashboardSectionHeading";
import { CategoryType, type Category } from "../../../types/category.type";

  const tabs = [
    {
      label:"All",
      value:null
    }
    ,
    {
       label:"Expense",
      value:CategoryType.EXPENSE
    },
     {
       label:"Income",
      value:CategoryType.INCOME
    },
     {
       label:"Saving",
      value:CategoryType.SAVING
    }
  ]

  
function UserCategories() {
  const [allCategories,setAllCategories] =  useState<Category[]>([])
  const {categoriesQuery,setCategoriesQueryParams} = useCategoriesPageProviderContext()
  const {data,isFetching} = categoriesQuery
  const categories =  data?.data||[]
  const meta = data?.meta
  const [activeTab,setActiveTab] =  useState<string|null>(null)
  const [page,setPage] = useState(1)
 
  const isMoreAvailable =    meta && meta.total_results > (meta.limit*meta.page )

  const handelTabSwitch = (value:string|null)=>{
    setActiveTab(value)
    setAllCategories([])
    setPage(1)
    if(value) {
      setCategoriesQueryParams({
      type:value,
      page:1
    })
    }
    else {
      setCategoriesQueryParams(({type,...oth})=>({...oth,page:1}))
    }
    
  }
 
  const handelLoadMore = ()=>{
  if(!isMoreAvailable) return 
  const newPage = page+1
  setPage(newPage)
  setCategoriesQueryParams(p=>({
    ...p,
    page:newPage
  }))
  }

  function reset  (){
    setActiveTab(null)
    setAllCategories([])
    setPage(1)
    setCategoriesQueryParams(({type,...oth})=>({...oth,page:1}))
  }
 

  useEffect(() => {
  if (categories.length) {
    setAllCategories(prev => {
      const existingIds = new Set(prev.map(cat => cat.id));
      const newItems = categories.filter(cat => !existingIds.has(cat.id));
      return [...prev, ...newItems];
    });
  }
}, [categories,isFetching]);

  return (
    <ArriveAnimationContainer delay={0.5}>
      <div className="mt-10">
        <div className="text-center mb-5">
          <CreateUserCategoryModal onSuccess={reset} />
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 ">
          <DashboardSectionHeading heading="Your Categories" />
          <div role="tablist" className="tabs tabs-box">
            {
              tabs.map(tab=>(
                  <a role="tab"  onClick={()=>handelTabSwitch(tab.value)} className={`tab ${tab.value === activeTab  ?'tab-active':''} `}>
             {tab.label}
            </a>
              ))
            }
            
          </div>
        </div>

        <div className="mt-5 p-4 md:p-8 bg-base-300 rounded-2xl shadow-lg space-y-6">
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-5 ">
            {allCategories.map((_, index) => (
              <UserCategoryCard category={_} key={index} />
            ))}
          </div>
        </div>
       {
       isMoreAvailable ?
        ( <div className="mt-10 text-center">
          <button className="btn  btn-secondary disabled:btn-secondary" disabled={isFetching} onClick={handelLoadMore}>{isFetching ?"Loading more.." :"Load more"}</button>
        </div>)
        :
        null
       }
      </div>
    </ArriveAnimationContainer>
  );
}

export default UserCategories;
