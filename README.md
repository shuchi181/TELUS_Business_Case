# TELUS Business Case (Maiku Nakajima)
> Project made with MERN Stack (MongoDB, Express JS, React JS, Node JS). 

## Thought Process
1. Use an external react component [react-jsonschema-form](https://react-jsonschema-form.readthedocs.io/en/latest/), which allows me to build a HTML form from a json schema. We could then save the json into the database so that we can edit and publish the form at anytime.

**The problem**: Learning how to use this third party component will take more time than I have.

2. Making a semi dynamic form builder with just React and the backend that will allow us to edit forms and publish them.

## Bugs to fix and Improvements to be made
**Bugs:**
1. Components not rerendering after redux state is changed.
2. Previously visited form data is showing up in the current form.

When user views a form and then a different form, the data from the previous form is populated in the current form. Which is definitely not good. I believe the reason why this is happening is due to the fact that redux does a shallow comparison between the previous state and the new state, to see if component should rerender or not. So It sees the form data as unchanged and therefore does not rerender the component which means the new form data is not populated until browser is manually refreshed.

**Improvements:**
1. Add authentication so dashboard is not public.
2. Restructure database for more efficient data retrieval and upload.
3. **Make Form Fully Dynamic**
4. Make UI look more pleasant
5. Option to download response as CSV or .xml





