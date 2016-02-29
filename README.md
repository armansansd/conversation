## Conversation

_Conversation_ is a prototype of a content management system focused on time.  
This prototype is an application of ideas developed through  _Timing_ , _Timing_ was a concept of a file manager where one can explore and wander through the activity of their computer. You can find more information [here](http://armansansd.net/?title=20150713-timing).
This system is also used for my blog about the representation of time in technology [aux](http://aux.armansansd.net).

#### How to

to use this first version of Conversation, you simply extract the folder into your server and add content to the folder "/data". You might need a little workaround for the permission.
To open the edit mode : click on the icon

#### Process & architecture

I would like to develop this tool to propose a different way to produce articles, link content and browse it, mostly time oriented.  
A **conversation** is a set of documents linked under a timestamp (which are stored in a json file and pushed into a data attribute).


```
+---/index.php
+---/assets/
|   ----function.js
|   ----push_json.php   
|   ----scandir.php
+---/data
```

* **index.php** : retrieve and display files uploaded in the data folder.
* **function.js** :
  * click on an image to show files related to the object clicked
  * edit mode, allow the user to link files together
* **push_json.php** : used by function.js, it pushes the new conversation timestamp into *filename_info.json*
* **scandir.php** : scan the data directory to produce .json files attached to each content if missing. It is launched each time the user opens the edit mode.

---

A number of functions need to be added :

* Timeline
* text, video and link implementation
* content upload system
* visualisation of the links between content
* erasing content and/or conversations
* create an admin mode

#### About the timeline

To allow the user to browse articles/conversation, he can either click on a file that he likes and that may be linked to others or a timeline is available to visualise all the conversations that have been created.

![timeline](http://armansansd.net/image_stock/conv_timeline.png)

---
note : as I learn by doing, the entire javascript code needs to be rewritten in order to be more clear and sustainable.
