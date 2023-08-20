import pickle
model = None
def predict_spam(message):
    global model
    prob = model.predict_proba([message])
    res = model.predict([message])
    return ["Spam",prob[0][1]]
   
        
def load_model():
    global model
    with open("..\model\smsNB.pickle","rb") as f:
        model = pickle.load(f)


if __name__ == "__main__":
    print("Inside main")
    load_model()
    print(predict_spam("Free"))
    print("Done")