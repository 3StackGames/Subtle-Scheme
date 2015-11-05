# Subtle Scheme Backend

This is the the backend for 3Stack's Subtle Scheme Game, based on the Digital-Compass game framework.

## Running in Development

### IntelliJ Instructions

File > Open > [open the pom.xml]

## Deploying on a Linux Server

1. Go to the directory `cd [path to repo]/backend`
2. Compile jar `mvn clean compile assembly:single`
3. Run the application `java -cp target/subtle_scheme-1.0-SNAPSHOT-jar-with-dependencies.jar com.three_stack.subtle_scheme.Main`
  * If you want to run the application in the background and have it persist upon logging out, run: `nohup java -cp target/subtle_scheme-1.0-SNAPSHOT-jar-with-dependencies.jar com.three_stack.subtle_scheme.Main &`
