import os
import shutil
from sklearn.model_selection import train_test_split

# Function to create directories if they don't exist
def create_dir(path):
    if not os.path.exists(path):
        os.makedirs(path)

# Assuming all images are in a single directory with subfolders for each class
base_dir = 'path_to_your_images'
classes = ['sad', 'angry', 'happy']  # update this based on your class labels

# Set paths for the train, validation, and test directories
train_dir = os.path.join(base_dir, 'train')
val_dir = os.path.join(base_dir, 'val')
test_dir = os.path.join(base_dir, 'test')

# Create directories
create_dir(train_dir)
create_dir(val_dir)
create_dir(test_dir)
for cls in classes:
    create_dir(os.path.join(train_dir, cls))
    create_dir(os.path.join(val_dir, cls))
    create_dir(os.path.join(test_dir, cls))

# Split data and move files
for cls in classes:
    # Source directory for each class
    src_dir = os.path.join(base_dir, cls)
    
    # Get a list of all files in the source directory
    files = [os.path.join(src_dir, f) for f in os.listdir(src_dir) if os.path.isfile(os.path.join(src_dir, f))]
    
    # Split data: 80% train, 10% validation, 10% test
    train_files, test_files = train_test_split(files, test_size=0.2, random_state=42)  # First, split into 80% train and 20% test
    val_files, test_files = train_test_split(test_files, test_size=0.5, random_state=42)  # Split the 20% into two parts: 10% val, 10% test
    
    # Function to copy files to a target directory
    def copy_files(files, target_dir):
        for file in files:
            shutil.copy(file, os.path.join(target_dir, cls))
    
    # Copy files to the respective directories
    copy_files(train_files, train_dir)
    copy_files(val_files, val_dir)
    copy_files(test_files, test_dir)

print("Data successfully split into train, validation, and test sets.")
