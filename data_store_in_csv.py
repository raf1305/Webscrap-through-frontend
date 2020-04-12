#saving title,date and link in a csv file for later visual

def data_write(title,date,link):
    f=open("new.csv","a+")
    f.write(title+","+date+","+link+"\n")
    f.close()