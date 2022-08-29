This Visual Analytics Module (VA) offers the functionality for MORE platform users to interact with the timeseries data and be informed on various KPIs 
and complex events in real time. This module offers a dashboard like UI for the visualization and interaction with various types of data, such as hierarchical multidimensional timeseries. 
In the MORE Visual Engine and Analytics module, the user is greeted with a map containing different RES. Moreover, the user is greeted with a variety of panels from where they can navigate the different RES farms, filter the visualized RES by their categorical features or view numerical statistics derived from the objects currently shown on the map. 
These statistics are derived from the data stored in the in-memory database and are updated to correspond to the current state of visualization. 
They can select an RES to visualize and analyze, its data is parsed and indexed on-the-fly, generating a
“crude” initial version of our index. The user, then, performs visual operations, which are translated to queries evaluated over the index.
Based on the user interaction, the index is adapted incrementally, adjusting its structure and updating statistics.


 
* Online Tool Demo: [[Link]](http://leviathan.imsi.athenarc.gr:8090)



<br/>
<br/>


## Building MORE VA module  
To build the MORE VA JAR file run:

```

./mvnw -Pprod clean verify


```

To start the application, run the single executable JAR file that starts an embedded Apache Tomcat:

```

java -jar target/*.jar


```

Then navigate to [http://localhost:8090](http://localhost:8090) in your browser.







 

</br>
