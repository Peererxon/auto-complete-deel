1: The main difference is how is evaluated to re-render. The component render for a couple of reasons and one of them is that it renders when the parent component renders and to avoid this unnecessaries renders we use PureComponent and with this the component only render is the props (without talking about to inner changes that lead to renders such as state changes) changes.

The problem might occur if the PureCompónent is called in a deep child and then the component will return falses statement because react doesn’t eval it properly because is use a shallow comparation.

2 –--

3: sending the setState from the parent to the children and then using the setState in the children. Using Context. Using Redux. Sending a handler that handles the setState of the parent to the children and then using that handler in the children

4: Using memo/pureComponent. Using a useCallback in a function that you are sending to a children to not re-created the handler/function on each updated of the component.

5: We need fragment to not set more DOM than is needed. With this we can iterate in a list with a wrapper without create a new div on each iteration.
list.map(item) => <div> {item}</div> //NO
list.map(item) => <>{item}</> //YES
this is not going to break the app but it might slow it down.

6:
1 The connect of React-redux
2 Creating a HOC that handles the fetch/error/loading data of your component and only sending the url to it. Then inject the data to the wrapped component and print it or not based on the condition
3 Creating a HOC that you has a template in wich you can send the pices of code that you are going to use.
<HocTemplate header={CustomHeader } body={CustomBody}/> 4. HOC to handle the Auth of an app and lead to the public or privates views based on a certain condition (be authenticated, for example)

7. In promises you use reject(error)
   in the callbacks you have a second function (data=>{},error=>{})) that is going to be trigger is the request failed.
   With async await you need a try catch and is something go wrong/broke the execution code will be move into the catch(error) code

8. --

9. Look at the lifecycle methods that are used, look at the state that is used and then adapt that to the functional way. Also, change the render() to only return.
10. CSS modules (myStyles.module.css), importing CSS files (myStyles.css) and with inline CSS (dirty)
11. Using dangerouslySetInnerHTML in the tag
<div dangerouslySetInnerHTML={{
              __html: item,
            }}
></div>
