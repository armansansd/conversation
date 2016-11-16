## Conversation

_Conversation_ is a prototype of a content management system focused on time and tag.  
This prototype is an application of ideas developed through  _Timing_ , _Timing_ was a concept of a file manager where one can explore and wander through the activity of their computer.


#### How to

to use this first version of Conversation, you simply extract the folder into your server and add content to the folder "/data". You might need a little workaround for the permission.
To open the edit mode : click on the icon

#### Process & architecture

I would like to develop this tool to propose a different way to produce articles, link content and browse it, mostly time oriented.  
A **conversation** is a set of documents linked under a timestamp (which are stored in a json file and pushed into a data attribute).    
When the user select one content of its library, all the other related (linked) media are displayed. 

#### How to

to use this first version of Conversation, you simply extract the folder into your server and add content to the folder "/data". You might need a little workaround for the permission.
To open the edit mode : click on the icon   
This prototype only work with images.  


```
+---/index.php
+---/assets/
|   +---/js/	
|		+----conversation.js
|		+----function.js
|		+----jquery.js
|   +---/css/
|		+----index.css
|   ----conv_push_json.php   
|   ----conv_scan_data_dir.php
+---/data
```

* **index.php** : retrieve and display files uploaded in the data folder.
* **conversation.js** :
  * click on an image to show files related to the object clicked
  * edit mode, allow the user to link files together
* **function.js** :  
  * some very praticle functions
* **conv_push_json.php** : used by function.js, it pushes the new conversation timestamp into *filename_info.json*
* **conv_scan_data_dir.php** : scan the data directory to produce .json files attached to each content if missing. It is launched each time the user opens the edit mode.

---


to do :

* Timeline
* text, video and link implementation
* add-on for web-browser
* content upload system
* erasing content and/or conversations
* create an admin mode

---
note : as I learn by doing, the entire javascript code needs to be rewritten in order to be more clear and sustainable.

---


####branch "hoover"  

Tool to sniff and grab content that you want from the web.
-> focus on gathering content from the web. 

