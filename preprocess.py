import os
import shutil
from sklearn.model_selection import train_test_split

class preprocess:
    # Function to create directories if they don't exist
    def create_dir(self,path):
        if not os.path.exists(path):
            os.makedirs(path)

    def run(self):
        base_dir = 'data'
        classes = ['sad', 'angry', 'happy'] 

        # Set paths for the train, validation, and test directories
        train_dir = os.path.join(base_dir, 'train')
        val_dir = os.path.join(base_dir, 'val')
        test_dir = os.path.join(base_dir, 'test')

        # Create directories
        self.create_dir(train_dir)
        self.create_dir(val_dir)
        self.create_dir(test_dir)
        for cls in classes:
            self.create_dir(os.path.join(train_dir, cls))
            self.create_dir(os.path.join(val_dir, cls))
            self.create_dir(os.path.join(test_dir, cls))

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

        # Function to count files in a directory for each class
        def count_files(dir_path):
            counts = {}
            total = 0
            for cls in classes:
                cls_path = os.path.join(dir_path, cls)
                num_files = len(os.listdir(cls_path))
                counts[cls] = num_files
                total += num_files
            return total, counts

        # Print the number of files in each set
        train_total, train_counts = count_files(train_dir)
        val_total, val_counts = count_files(val_dir)
        test_total, test_counts = count_files(test_dir)

        print(f"\nData successfully split into train, validation, and test sets.")
        print(f"Train set: {train_total} images - {train_counts}")
        print(f"Validation set: {val_total} images - {val_counts}")
        print(f"Test set: {test_total} images - {test_counts}")
