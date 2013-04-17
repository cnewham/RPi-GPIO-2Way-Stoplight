import RPi.GPIO as GPIO
import time

# use P1 header pin numbering convention
GPIO.setmode(GPIO.BOARD)

# Set up the GPIO channels - one input and one output
# GPIO.setup(11, GPIO.IN)
GPIO.setup(16, GPIO.OUT)
GPIO.setup(18, GPIO.OUT)
GPIO.setup(22, GPIO.OUT)

# Input from pin 11
# input_value = GPIO.input(11)

# Output to pin 12
GPIO.output(16, GPIO.HIGH)

time.sleep(1)

GPIO.output(18, GPIO.HIGH)

time.sleep(1)

GPIO.output(22, GPIO.HIGH)

time.sleep(1)

GPIO.output(22, GPIO.LOW)  

time.sleep(1)

GPIO.output(18, GPIO.LOW)

time.sleep(1)

GPIO.output(16, GPIO.LOW)

# The same script as above but using BCM GPIO 00..nn numbers
# GPIO.setmode(GPIO.BCM)
# GPIO.setup(17, GPIO.IN)
# GPIO.setup(18, GPIO.OUT)
# input_value = GPIO.input(17)
# GPIO.output(18, GPIO.HIGH)

GPIO.cleanup()

