# TOC
   - [End To End tests example](#end-to-end-tests-example)
     - [Fake Google Test example](#end-to-end-tests-example-fake-google-test-example)
<a name=""></a>
 
<a name="end-to-end-tests-example"></a>
# End To End tests example
<a name="end-to-end-tests-example-fake-google-test-example"></a>
## Fake Google Test example
should have the right title.

```js
client.get(options.baseUrl);
client.wait(client.getTitle(), 10000)
  .then(function(title){
      assert.equal(title, 'Google');
  });
```

